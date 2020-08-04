import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  public schema;

  constructor() { }

  prepareSchema(data: any = null) {
    data = (data == null) ? this.getDefaultSchema() : data;
    this.schema = data;
  }

  getDefaultSchema() {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://www.sports.info/#website",
          "url": "https://www.sports.info/",
          "name": "Sports.info",
          "description": "Cricket|Soccer|Football|NBA|Sports News Live Scores|Players & Team Rankings",
          "potentialAction": [
            {
              "@type": "SearchAction",
              "target": "https://www.sports.info/?s={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          ],
          "inLanguage": "en-US"
        },
        {
          "@type": "WebPage",
          "@id": "https://www.sports.info/#webpage",
          "url": "https://www.sports.info/",
          "name": "Cricket score, Cricket News, Pro kabaddi live score, NBA scores, Kabaddi score, Tennis score, Badminton score | Sports.info",
          "isPartOf": {
            "@id": "https://www.sports.info/#website"
          },
          "datePublished": "2018-01-10T16:34:21+00:00",
          "dateModified": "2020-07-06T15:47:05+00:00",
          "description": "SportsInfo offers cricket, soccer, kabaddi, tennis, badminton, racing, basketball and other sports news, articles, videos, live coverage & live scores, player rankings & team rankings.",
          "inLanguage": "en-US",
          "potentialAction": [
            {
              "@type": "ReadAction",
              "target": [
                "https://www.sports.info/"
              ]
            }
          ]
        }
      ]
    }
  };
}
