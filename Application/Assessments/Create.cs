using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Assessments
{
    public class Create
    {
        public class Command : IRequest
        {
            public Assessment Assessment { get; set; }
        }
    }

    public class Handler : IRequestHandler<Create.Command>
    {
        private readonly DataContext _context;
        public Handler(DataContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(Create.Command request, CancellationToken cancellationToken)
        {
            _context.Assessments.Add(request.Assessment);
            await _context.SaveChangesAsync();

            return Unit.Value;
        }
    }
}