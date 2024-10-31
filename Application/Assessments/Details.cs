using Domain;
using MediatR;
using Persistence;

namespace Application.Assessments
{
    public class Details
    {
        public class Query : IRequest<Assessment>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Assessment>
        {

            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Assessment> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Assessments.FindAsync(request.Id);
            }
        }
    }
}