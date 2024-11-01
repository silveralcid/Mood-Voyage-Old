using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Assessments
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Assessment Assessment { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var assessment = await _context.Assessments.FindAsync(request.Assessment.Id);

                assessment.LivelihoodAvgRating = request.Assessment.LivelihoodAvgRating;

                await _context.SaveChangesAsync();

                return await Unit.Task;
            }
        }
    }
}