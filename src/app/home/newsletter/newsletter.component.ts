import { Component, OnInit } from '@angular/core';
import { NewsletterService } from '../../service/newsletter.service';
import { Newsletter } from 'src/app/model/newsletter';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})

export class NewsletterComponent implements OnInit {
  newsletters: Newsletter[] = [];

  constructor(
    private newsletterService: NewsletterService,
    private http: HttpClient,
    ) { }

  ngOnInit() {
    this.getUserEmailFromNewsletter();
  }

  getUserEmailFromNewsletter() {
    // console.log('you are here!');
    this.newsletterService.getTiti()
      .subscribe((response: Newsletter[]) => {
        console.log(Object.values(response)[4]);
        // console.log(Object.keys(response)[4]);
        // this.newsletters = response;
        // console.log(response['hydra:member']);
        // console.log(typeof response);
      });
  }

//   {
//     "@context": "/api/contexts/Newsletter",
//     "@id": "/api/newsletters",
//     "@type": "hydra:Collection",
//     "hydra:totalItems": 10,
//     "hydra:member": [
//         {
//             "@id": "/api/newsletters/1",
//             "@type": "Newsletter",
//             "id": 1,
//             "email": "albin.reichel@gmail.com",
//             "createdAt": "2023-12-02T21:28:20+00:00"
//         },
//         {
//             "@id": "/api/newsletters/2",
//             "@type": "Newsletter",
//             "id": 2,
//             "email": "jaime40@hotmail.com",
//             "createdAt": "2023-12-02T21:28:20+00:00"
//         },
//         {
//             "@id": "/api/newsletters/3",
//             "@type": "Newsletter",
//             "id": 3,
//             "email": "kaia08@gmail.com",
//             "createdAt": "2023-12-02T21:28:20+00:00"
//         },
//         {
//             "@id": "/api/newsletters/4",
//             "@type": "Newsletter",
//             "id": 4,
//             "email": "espinka@hotmail.com",
//             "createdAt": "2023-12-02T21:28:20+00:00"
//         },
//         {
//             "@id": "/api/newsletters/5",
//             "@type": "Newsletter",
//             "id": 5,
//             "email": "von.jabari@hotmail.com",
//             "createdAt": "2023-12-02T21:28:20+00:00"
//         },
//         {
//             "@id": "/api/newsletters/6",
//             "@type": "Newsletter",
//             "id": 6,
//             "email": "jblick@yahoo.com",
//             "createdAt": "2023-12-02T21:28:20+00:00"
//         },
//         {
//             "@id": "/api/newsletters/7",
//             "@type": "Newsletter",
//             "id": 7,
//             "email": "tiara14@hotmail.com",
//             "createdAt": "2023-12-02T21:28:20+00:00"
//         },
//         {
//             "@id": "/api/newsletters/8",
//             "@type": "Newsletter",
//             "id": 8,
//             "email": "donnelly.keely@gmail.com",
//             "createdAt": "2023-12-02T21:28:20+00:00"
//         },
//         {
//             "@id": "/api/newsletters/9",
//             "@type": "Newsletter",
//             "id": 9,
//             "email": "rbraun@gmail.com",
//             "createdAt": "2023-12-02T21:28:20+00:00"
//         },
//         {
//             "@id": "/api/newsletters/10",
//             "@type": "Newsletter",
//             "id": 10,
//             "email": "eswaniawski@hotmail.com",
//             "createdAt": "2023-12-02T21:28:20+00:00"
//         }
//     ]
// }

}