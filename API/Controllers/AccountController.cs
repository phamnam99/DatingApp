using API.Data;
using API.Dtos;
using API.Entities;
using API.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto acc)
        {
            var existUser = await UserExists(acc.Username);
            if (existUser) throw new Exception("Exist username");

            return Ok();
            //using var hmac = new HMACSHA512();

            //var userCreate = new AppUser
            //{
            //    UserName = acc.Username.ToLower(),
            //    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(acc.Password)),
            //    PasswordSalt = hmac.Key
            //};

            //await _context.Users.AddAsync(userCreate);

            //await _context.SaveChangesAsync();

            //var res = new UserDto
            //{
            //    Username = userCreate.UserName,
            //    Token = _tokenService.CreateToken(userCreate)
            //};

            //return res;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

            if (user == null) throw new Exception("Invalid username");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for(int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            var res = new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };

            return res;
        }

        private async Task<bool> UserExists(string userName)
        {
            return await _context.Users.AnyAsync(x => x.UserName == userName.ToLower());
        }
    }
}
