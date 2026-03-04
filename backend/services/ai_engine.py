import boto3
import json
import os

bedrock = boto3.client(
    "bedrock-runtime",
    region_name="us-east-1"
)

def call_llm(prompt: str):

    response = bedrock.invoke_model(
        modelId="arn:aws:bedrock:us-east-1:774157348068:application-inference-profile/ve2c2r8wj5l5",
        body=json.dumps({
            "inputText": prompt,
            "textGenerationConfig": {
                "maxTokenCount": 500,
                "temperature": 0.7
            }
        }),
        contentType="application/json",
        accept="application/json"
    )

    result = json.loads(response["body"].read())

    return result["results"][0]["outputText"]