using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace API.Controllers
{
    public class NeedsController : BaseApiController
    {
        private readonly DataContext _context;
        public NeedsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet] // /api/needs
        public async Task<ActionResult<List<Need>>> GetActivities()
        {
            return await _context.Needs.ToListAsync();
        }

        [HttpGet("{id}")] // /api/needs/xyz
        public async Task<ActionResult<Need>> GetNeed(Guid id)
        {
            return await _context.Needs.FindAsync(id);
        }

    }
}