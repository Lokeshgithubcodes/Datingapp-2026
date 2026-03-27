using System;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BuggyController: BaseApiController
{
    [HttpGet("auth")]
    public IActionResult GetAuth()
    {
        return Unauthorized();
    }
    [HttpGet("not-found")]
    public IActionResult GetNotFound()
    {
        return NotFound();
    }
    [HttpGet("server-error")]
    public IActionResult GetServerError()
    {
        throw new Exception("this is a Server error");
    }
    [HttpGet("bad-request")]
    public IActionResult GetBadRequest()
    {
        return BadRequest("this was no a good request");
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("admin-secret")]
    public ActionResult<string> GetSecretAdmin()
    {
        return Ok("Only admins should see");
    }
}
