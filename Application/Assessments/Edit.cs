using AutoMapper;
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var assessment = await _context.Assessments.FindAsync(request.Assessment.Id);

                _mapper.Map(request.Assessment, assessment);
                await _context.SaveChangesAsync();

                return await Unit.Task;
            }
        }
    }
}