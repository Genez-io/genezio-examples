package backend

import (
	"context"
	"os"

	"github.com/sashabaranov/go-openai"
)

// genezio: deploy
type GptCaller struct {
	GptClient *openai.Client
}

func New() GptCaller {
	url := os.Getenv("OPENAI_SECRET_KEY")
	if url == "" {
		panic("Your OPENAI_SECRET_KEY environment variable is not properly set, go to https://genezio.com/blog/create-your-first-app-using-chatgpt/ to learn how to obtain an OpenAI key")
	}
	client := openai.NewClient(url)
	return GptCaller{GptClient: client}
}

func (b GptCaller) AskChatGpt(prompt string) (string, error) {
	req := openai.ChatCompletionRequest{
		Model: openai.GPT3Dot5Turbo,
		Messages: []openai.ChatCompletionMessage{
			{
				Role: openai.ChatMessageRoleUser,
				Content: "rephrase this:" + prompt,
			},
		},
	}
	resp, err := b.GptClient.CreateChatCompletion(context.Background(),req)
	if err != nil {
		return "", err
	}
	return resp.Choices[0].Message.Content, nil
}
