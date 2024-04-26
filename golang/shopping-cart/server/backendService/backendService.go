package backend

import (
	"context"
	"errors"
	"os"

	"github.com/redis/go-redis/v9"
)

type Response struct {
	Status  string  `json:"status"`
	Country string  `json:"country"`
	Lat     float64 `json:"lat"`
	Lon     float64 `json:"lon"`
	City    string  `json:"city"`
}

type CartItem struct {
	Title string `json:"title"`
	Count string `json:"count"` 
}

var ErrCartDoesNotExist = errors.New("Cart does not exist")
var ErrItemDoesNotExist = errors.New("Item does not exist in cart")

// genezio: deploy
type ShoppingCartService struct{
	redis *redis.Client
	ctx context.Context
}

func New() ShoppingCartService {
	url :=  os.Getenv("UPSTASH_REDIS_URL")
	if(url == ""){
		panic("It seems that UPSTASH_REDIS_URL is not set in the `.env` file. Check the documentation https://genezio.com/docs/integrations/upstash-redis to learn how to integrate with Upstash Redis into your project.")

	}
	opts,err := redis.ParseURL(url)
	if err != nil {
		panic(err)
	}
	client := redis.NewClient(opts)
	return ShoppingCartService{
		redis: client,
		ctx: context.Background(),
	}
}

// increment item count by 1 for a given item corresponding to the sessionId
func (s ShoppingCartService) AddItemToCart(sessionId string,item string) (string, error) {

	_, err := s.redis.HIncrBy(s.ctx, "cart:"+sessionId , item,1).Result()
	if(err != nil){
		return "Failed to add item to cart", err
	}
	return "Item added to cart", nil
}

func (s ShoppingCartService) GetCart(sessionId string) ([]CartItem, error) {

	cart, err := s.redis.HGetAll(s.ctx, "cart:"+sessionId).Result()
	if(err != nil){
		return nil, err
	}
	items := []CartItem{}
	for k,v := range cart {
		items = append(items, CartItem{Title: k, Count: v})
	}
	return items, nil
}

func (s ShoppingCartService) RemoveItemFromCart(sessionId string,item string) (string, error) {
	itemExists , err := s.redis.HExists(s.ctx, "cart:"+sessionId, item).Result()
	if(err != nil){
		return "Failed to remove item from cart", err
	}
	if(!itemExists){
		return "Item does not exist in cart", ErrItemDoesNotExist
	}
	_, err = s.redis.HIncrBy(s.ctx, "cart:"+sessionId , item,-1).Result()
	if(err != nil){
		return "Failed to remove item from cart", err
	}
	itemCount, err := s.redis.HGet(s.ctx, "cart:"+sessionId, item).Result()
	if(err != nil){
		return "Failed to remove item from cart", err
	}
	if(itemCount == "0"){
		_, err = s.redis.HDel(s.ctx, "cart:"+sessionId, item).Result()
		if(err != nil){
			return "Failed to remove item from cart", err
		}
	}
	return "Item removed from cart", nil	
}

func (s ShoppingCartService) DeleteCart(sessionId string) (string, error) {
	cartExists , err := s.redis.Exists(s.ctx, "cart:"+sessionId).Result()
	if(err != nil){
		return "Failed to delete cart", err
	}
	if(cartExists == 0){
		return "Cart does not exist", ErrCartDoesNotExist
	}
	_, err = s.redis.Del(s.ctx, "cart:"+sessionId).Result()
	if(err != nil){
		return "Failed to delete cart", err
	}
	return "Cart deleted", nil
}

