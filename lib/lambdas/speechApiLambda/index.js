export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const headers = {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
  };

  const response = {
    statusCode: 500,
    headers,
    body: 'Something went wrong',
  };

  const sendSpeechTextRequiredResponse = () => {
    response.statusCode = 400;
    response.body = 'Speech Text is required';
  };

  if (event.body) {
    const body = JSON.parse(event.body);
    const text = body.text;
    if (text) {
      response.statusCode = 200;
      response.body = `Welcome to Our Portal.Your text was: "${text}"`;
    } else {
      sendSpeechTextRequiredResponse();
    }
  } else {
    sendSpeechTextRequiredResponse();
  }

  return response;
};
