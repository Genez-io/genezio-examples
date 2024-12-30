def handler(event):
    print("Function was invoked with event: {}".format(event))
    
    name = event.get("queryStringParameters", {}).get("name", "World")
    
    return {
        "statusCode": 200,
        "body": f"Hello, {name}! Welcome to Genezio Functions!"
    }
