using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Assessments
{
    public class List
    {
        public class Query : IRequest<List<Domain.Assessment>> { }

        public class Handler : IRequestHandler<Query, List<Domain.Assessment>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<List<Assessment>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Assessments.ToListAsync();
            }
        }
    }
}