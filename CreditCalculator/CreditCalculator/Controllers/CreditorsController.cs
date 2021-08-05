using BusinessLogicLayer.Models;
using BusinessLogicLayer.Models.Response;
using BusinessLogicLayer.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CreditCalculator.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CreditorsController : ControllerBase
    {
        private readonly IPlatonService _platonService;
        public CreditorsController(IPlatonService platonService)
        {
            _platonService = platonService;
        }

        [HttpGet]
        public CreditorResponseModel getCreditors()
        {
            CreditorResponseModel creditorResponseModel = _platonService.getCreditors();

            return creditorResponseModel;
        }

        [HttpPost]
        public ResponseModel AddCreditor([FromBody] CreditorModel creditorModel)
        {
            ResponseModel responseModel = _platonService.addCreditor(creditorModel);

            return responseModel;
        }

        [HttpPost("addTypeCreditor")]
        public ResponseModel AddTypeCreditor([FromQuery] string nameCreditor, [FromBody] TypeCreditorModel typeCreditorModel)
        {
            ResponseModel responseModel = _platonService.addTypeCreditor(nameCreditor, typeCreditorModel);

            return responseModel;
        }

        [HttpDelete("delTypeCreditor")]
        public ResponseModel DelTypeCreditor([FromQuery] string nameCreditor, [FromQuery] string nameTypeCreditor)
        {
            ResponseModel responseModel = _platonService.delTypeCreditor(nameCreditor, nameTypeCreditor);

            return responseModel;
        }

        [HttpDelete]
        public ResponseModel DeleteCreditor([FromQuery] string name)
        {
            ResponseModel responseModel = _platonService.deleteCreditor(name);

            return responseModel;
        }
    }
}
