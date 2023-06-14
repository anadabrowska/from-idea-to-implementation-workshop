
import { SecretsManager } from 'aws-sdk';

export const getSecrets = async () => {
    console.log("Retrieving secret");
    const secretsManager = new SecretsManager({region: "us-west-2"});
    const SecretId = process.env.SECRET_ID || ""
    const params = {
        SecretId: SecretId
    };
    try{
    const secretResponse =  await secretsManager.getSecretValue(params).promise();
    console.log(secretResponse);
    const secretJson = JSON.parse(secretResponse?.SecretString || "")
    return secretJson["GPT_SECRET"]
    }catch(error){
        throw error;
    }
    
};

export default getSecrets;