import { Component } from '@angular/core';
import { OpenAIApi } from 'openai';
import { environment } from 'src/environments/environment';
import { Configuration } from 'openai/dist/configuration';
import { ThemePalette } from '@angular/material';

const configuration = new Configuration({
  apiKey: environment.openApiKey,
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  topic = '';
  essayFormats = ['Outline', 'Essay', ' Positive Review','Negative Review','Critque',]
  selectedEssayFormat = 'Essay'
  openai = new OpenAIApi(configuration);
  reviewOutput = '';
  isLoading = false;

  ngOnInit(): void{

  }

  completion() {
    (async () => {
      let myPrompt = 'Write a' + this.selectedEssayFormat + "about " + this.topic;
      this.isLoading = true;
      const gptResponse = await this.openai.createCompletion({
        model: "text-davinci-003",
        prompt: myPrompt,
        temperature: 0,
        max_tokens: 4000,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      });

      console.log(gptResponse.data);
      this.isLoading = false;
      this.reviewOutput = gptResponse.data.choices[0].text!;
    })();
  }
}
