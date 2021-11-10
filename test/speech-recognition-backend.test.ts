import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as SpeechRecognitionBackend from '../lib/speech-recognition-backend-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new SpeechRecognitionBackend.SpeechRecognitionBackendStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
