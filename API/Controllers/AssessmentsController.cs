using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace API.Controllers
{
    public class AssessmentsController : BaseApiController
    {
        private readonly DataContext _context;
        public AssessmentsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet] // /api/Assessments
        public async Task<ActionResult<List<Assessment>>> GetAssessments()
        {
            return await _context.Assessments.ToListAsync();
        }

        [HttpGet("{id}")] // /api/Assessments/xyz
        public async Task<ActionResult<Assessment>> GetAssessment(Guid id)
        {
            return await _context.Assessments.FindAsync(id);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAssessment(Assessment assessment)
        {
            assessment.Id = Guid.NewGuid();

            _context.Assessments.Add(assessment);
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtAction(nameof(GetAssessment), new { id = assessment.Id }, assessment);

            return BadRequest("Failed to create assessment");
        }

    }
}