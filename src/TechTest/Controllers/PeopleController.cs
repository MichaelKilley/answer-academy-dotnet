﻿using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using TechTest.Repositories;
using TechTest.Repositories.Models;


namespace TechTest.Controllers
{
    [Route("api/people")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        public PeopleController(IPersonRepository personRepository)
        {
            this.PersonRepository = personRepository;
        }

        private IPersonRepository PersonRepository { get; }

        [HttpGet]
        public IActionResult GetAll()        
        {
            // TODO: Step 1
            //
            // Implement a JSON endpoint that returns the full list
            // of people from the PeopleRepository. If there are zero
            // people returned from PeopleRepository then an empty
            // JSON array should be returned.

            // throw new NotImplementedException();
            // this Passes Test GetAll_Returns_OK  

            return this.Ok(PersonRepository.GetAll());
            
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            // TODO: Step 2
            //
            // Implement a JSON endpoint that returns a single person
            // from the PeopleRepository based on the id parameter.
            // If null is returned from the PeopleRepository with
            // the supplied id then a NotFound should be returned.

            //throw new NotImplementedException();
                        
            var persons = this.PersonRepository.Get(id);

            if (persons == null)
            {
                return NotFound();
            }
            return this.Ok(persons);

        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, PersonUpdate personUpdate)
        {
            // TODO: Step 3
            //
            // Implement an endpoint that receives a JSON object to
            // update a person using the PeopleRepository based on
            // the id parameter. Once the person has been successfully
            // updated, the person should be returned from the endpoint.
            // If null is returned from the PeopleRepository then a
            // NotFound should be returned.

            //  throw new NotImplementedException();

            var person = PersonRepository.Get(id);

            if (person == null)
            {
                return NotFound();
            }

            person.Authorised = personUpdate.Authorised;
            person.Enabled = personUpdate.Enabled;
            person.Colours = personUpdate.Colours;

            Person updatedPerson;

            try
            {
                updatedPerson = PersonRepository.Update(person);
                return Ok(updatedPerson);
            }
            catch (Exception)
            {

                return NotFound();
            }

        }
    }
}