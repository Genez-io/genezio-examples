package backend

import (
	"encoding/json"
	"net/http"
	"strconv"
)

type Response struct {
	Status  string  `json:"status"`
	Country string  `json:"country"`
	Lat     float64 `json:"lat"`
	Lon     float64 `json:"lon"`
	City    string  `json:"city"`
}

// genezio: deploy
type BackendService struct{}

func New() BackendService {
	return BackendService{}
}

func (b BackendService) Hello(name string) (string, error) {
	client := &http.Client{}

	req, err := http.NewRequest("GET", "http://ip-api.com/json/", nil)
	if err != nil {
		return "", err
	}

	resp, err := client.Do(req)
	if err != nil {
		return "Hello " + name + " Failed to get the server location :(", err
	}

	defer resp.Body.Close()

	body := Response{}
	err = json.NewDecoder(resp.Body).Decode(&body)
	if err != nil || body.Status != "success" {
		return "Hello " + name + " Failed to get the server location :(", err
	}
	return "Hello " + name +
		"! This response was served from " +
		body.City + ", " +
		body.Country +
		" (" + strconv.FormatFloat(body.Lat, 'f', -1, 64) +
		", " + strconv.FormatFloat(body.Lon, 'f', -1, 64) +
		")", nil
}
