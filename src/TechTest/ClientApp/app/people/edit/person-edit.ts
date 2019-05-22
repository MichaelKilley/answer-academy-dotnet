import { autoinject } from 'aurelia-framework';
import { Router, RouteConfig } from 'aurelia-router'
import { HttpClient, json } from 'aurelia-fetch-client';
import { Person } from '../models/person';
import { IColour } from '../interfaces/icolour';
import { IPerson } from '../interfaces/iperson';

@autoinject
export class PersonEdit {

    constructor(private http: HttpClient, private router: Router) { }

    private heading: string;
    private person: Person;
    private colourOptions: IColour[] = [];
    private routerConfig: RouteConfig;

    async activate(params, routerConfig: RouteConfig) {
        this.routerConfig = routerConfig;

        const personResponse = await this.http.fetch(`/people/${params.id}`);
        this.personFetched(await personResponse.json());

        const colourResponse = await this.http.fetch('/colours');
        this.colourOptions = await colourResponse.json() as IColour[];
    }

    personFetched(person: IPerson): void {
        this.person = new Person(person)
        this.heading = `Update ${this.person.fullName}`;
        this.routerConfig.navModel.setTitle(`Update ${this.person.fullName}`);
    }

    colourMatcher(favouriteColour: IColour, checkBoxColour: IColour) {
        return favouriteColour.id === checkBoxColour.id;
    }

    async submit() {

        // TODO: Step 7
        //
        // Implement the submit and save logic.
        // Send a JSON request to the API with the newly updated
        // this.person object. If the response is successful then
        // the user should be navigated to the list page.

        //throw new Error('Not Implemented');

        //URL from launchSettings and URL example
        // "applicationUrl": "http://localhost:50182/"  from launchSettings
        //var url = 'http://localhost:50182/api/people/1';      

        var UpdatePerson = this.person;

        var url = 'http://localhost:50182/api/people/' + UpdatePerson.id;

        var data = {
            "authorised": UpdatePerson.authorised,
            "enabled": UpdatePerson.enabled,
            "colours": UpdatePerson.colours
        }

        fetch(url, {
            method: 'PUT',              // or 'POST'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            //.then(response => console.log('Success:', JSON.stringify(response)))          
            .then(reponse => this.router.navigate('people'))

            .catch(error => console.error('Error:', error));
    }

    cancel() {
        this.router.navigate('people');
    }
}
