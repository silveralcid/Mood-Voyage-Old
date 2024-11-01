using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Assessments;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class AssessmentsController : BaseApiController
    {

        [HttpGet] // /api/Assessments
        public async Task<ActionResult<List<Assessment>>> GetAssessments()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] // /api/Assessments/xyz
        public async Task<ActionResult<Assessment>> GetAssessment(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateAssessment(Assessment assessment)
        {
            return Ok(await Mediator.Send(new Create.Command { Assessment = assessment }));
        }
    }
}