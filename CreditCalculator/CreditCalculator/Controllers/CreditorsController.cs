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

        [HttpGet("readTypeCreditor")]
        public TypeCreditorResponseModel getTypeCreditor([FromQuery] string nameCreditor, [FromQuery] string nameTypeCreditor )
        {
            TypeCreditorResponseModel typeCreditorResponseModel = _platonService.readTypeCreditorModel(nameCreditor, nameTypeCreditor);

            return typeCreditorResponseModel;
        }

        [HttpPost]
        public ResponseModel addCreditor([FromBody] CreditorModel creditorModel)
        {
            ResponseModel responseModel = _platonService.addCreditor(creditorModel);

            return responseModel;
        }

        [HttpPost("addTypeCreditor")]
        public ResponseModel addTypeCreditor([FromQuery] string nameCreditor, [FromBody] TypeCreditorModel typeCreditorModel)
        {
            ResponseModel responseModel = _platonService.addTypeCreditor(nameCreditor, typeCreditorModel);

            return responseModel;
        }

        [HttpPut]
        public ResponseModel updateTypeCreditor([FromQuery] string nameCreditor, [FromQuery] string nameTypeCreditor, [FromBody] TypeCreditorModel typeCreditorModel)
        {
            ResponseModel responseModel = _platonService.updateTypeCreditor(nameCreditor, nameTypeCreditor, typeCreditorModel);

            return responseModel;
        }

        [HttpDelete("delTypeCreditor")]
        public ResponseModel delTypeCreditor([FromQuery] string nameCreditor, [FromQuery] string nameTypeCreditor)
        {
            ResponseModel responseModel = _platonService.delTypeCreditor(nameCreditor, nameTypeCreditor);

            return responseModel;
        }

        [HttpDelete]
        public ResponseModel deleteCreditor([FromQuery] string name)
        {
            ResponseModel responseModel = _platonService.deleteCreditor(name);

            return responseModel;
        }
    }
}
