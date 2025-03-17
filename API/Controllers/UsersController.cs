using API.Data;
using API.Dtos;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IUserRepository _userRepo;
        private readonly IMapper _mapper;
        public UsersController(DataContext context, IUserRepository userRepo, IMapper mapper) {
            _context = context;
            _userRepo = userRepo;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _userRepo.GetUserAsync();

            var memberDto = _mapper.Map<IEnumerable<MemberDto>>(users);

            return Ok(memberDto);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var user = await _userRepo.GetUserByUsernameAsync(username);

            if (user == null) return NotFound();

            var res = _mapper.Map<MemberDto>(user);
            return res;
        }
    }
}
