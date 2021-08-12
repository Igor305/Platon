using BusinessLogicLayer.Models;
using BusinessLogicLayer.Models.Response;
using BusinessLogicLayer.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace BusinessLogicLayer.Services
{
    public class PlatonService : IPlatonService
    {
        private static List<CreditorModel> creditorModels = new List<CreditorModel>();
        private static string path = "Creditors.txt";
        private static string myChoice = "Свій вибір";

        public CreditorResponseModel getCreditors()
        {
            CreditorResponseModel creditorResponseModel = new CreditorResponseModel();
            try
            {
                if (creditorModels.Count == 0)
                {
                    readFromFile();
                }

                CreditorModel creditorModel = creditorModels.Find(x => x.Name == myChoice);

                if (creditorModel == null)
                {
                    CreditorModel creditor = new CreditorModel();
                    creditor.Name = myChoice;
                    creditorModels.Add(creditor);
                }

                creditorResponseModel.creditorModels = creditorModels;
                creditorResponseModel.Status = true;
                creditorResponseModel.Message = "successfully";
            }
            catch(Exception e)
            {
                creditorResponseModel.Status = false;
                creditorResponseModel.Message = e.Message;
            }

            return creditorResponseModel;
        }

        public ResponseModel addCreditor ( CreditorModel creditorModel )
        {
            ResponseModel responseModel = new ResponseModel();

            try
            {
                foreach (CreditorModel creditor in creditorModels)
                {
                    if (creditorModel.Name == creditor.Name)
                    {
                        responseModel.Status = false;
                        responseModel.Message = $"Кредитор {creditorModel.Name} назвою вже існує";
                        return responseModel;
                    }
                }

                creditorModels.Add(creditorModel);
                responseModel.Status = true;
                responseModel.Message = $"Кредитор {creditorModel.Name} успішно доданий";

                writeInFile();
            }
            catch(Exception e)
            {
                responseModel.Status = false;
                responseModel.Message = e.Message;
            }

            return responseModel;

        }

        public ResponseModel addTypeCreditor (string name, TypeCreditorModel typeCreditorModel)
        {
            ResponseModel responseModel = new ResponseModel();
            try
            {
                CreditorModel creditorModel = creditorModels.Find(x => x.Name == name);

                foreach (CreditorModel creditor in creditorModels)
                {
                    if(creditor.Name == name)
                    {
                        TypeCreditorModel typeCreditor = creditor.typeCreditorModels.Find(x => x.Name == typeCreditorModel.Name);

                        if (typeCreditor != null)
                        {
                            responseModel.Status = false;
                            responseModel.Message = $"Кредитор {name} має тип під назвою {typeCreditorModel.Name}";
                            return responseModel;
                        }

                        creditor.typeCreditorModels.Add(typeCreditorModel);
                    }
                }

                responseModel.Status = true;
                responseModel.Message = $"Тип {typeCreditorModel.Name} доданий кредитору {name} ";

                writeInFile();
            }
            catch (Exception e)
            {
                responseModel.Status = false;
                responseModel.Message = e.Message;
            }

            return responseModel;
        }

        public TypeCreditorResponseModel readTypeCreditorModel(string nameCreditor,string nameTypeCreditor)
        {
            TypeCreditorResponseModel typeCreditorResponseModel = new TypeCreditorResponseModel();

            try
            {
                foreach (CreditorModel creditor in creditorModels)
                {
                    if (creditor.Name == nameCreditor)
                    {
                        TypeCreditorModel typeCreditor = creditor.typeCreditorModels.Find(x => x.Name == nameTypeCreditor);

                        foreach (TypeCreditorModel type in creditor.typeCreditorModels)
                        {
                            if (type.Name == nameTypeCreditor)
                            {
                                typeCreditorResponseModel.typeCreditorModel = type;
                            }
                        }
                    }
                }

                typeCreditorResponseModel.Status = true;
                typeCreditorResponseModel.Message = $"Тип {nameTypeCreditor} кредитора {nameCreditor} був успішно зчитаний";
            }
            catch (Exception e)
            {
                typeCreditorResponseModel.Status = false;
                typeCreditorResponseModel.Message = e.Message;
            }

            return typeCreditorResponseModel;

        }

        public ResponseModel updateTypeCreditor(string nameCreditor, string nameTypeCreditor, TypeCreditorModel typeCreditorModel)
        {
            ResponseModel responseModel = new ResponseModel();

            try
            {
                CreditorModel creditorModel = creditorModels.Find(x => x.Name == nameCreditor);

                foreach (CreditorModel creditor in creditorModels)
                {
                    if (creditor.Name == nameCreditor)
                    {
                        TypeCreditorModel typeCreditor = creditor.typeCreditorModels.Find(x => x.Name == typeCreditorModel.Name);

                        foreach (TypeCreditorModel type in creditor.typeCreditorModels)
                        {
                            if (type.Name == nameTypeCreditor)
                            {
                                type.Name = typeCreditorModel.Name;
                                type.MinSum = typeCreditorModel.MinSum;
                                type.MaxSum = typeCreditorModel.MaxSum;
                                type.MinTerm = typeCreditorModel.MinTerm;
                                type.MaxTerm = typeCreditorModel.MaxTerm;
                                type.Bid = typeCreditorModel.Bid;
                            }
                        }
                    }
                }

                responseModel.Status = true;
                responseModel.Message = $"Тип {nameTypeCreditor} кредитора {nameCreditor} був успішно змінений";

                writeInFile();
            }
            catch (Exception e)
            {
                responseModel.Status = false;
                responseModel.Message = e.Message;
            }

            return responseModel;
        }

        public ResponseModel delTypeCreditor(string nameCreditor, string nameTypeCreditor)
        {
            ResponseModel responseModel = new ResponseModel();

            try
            {               
                CreditorModel creditorModel = creditorModels.Find(x => x.Name == nameCreditor);

                foreach (CreditorModel creditor in creditorModels)
                {
                    if (creditor.Name == nameCreditor)
                    {
                        TypeCreditorModel typeCreditorModel = creditor.typeCreditorModels.Find(x => x.Name == nameTypeCreditor);
                        creditor.typeCreditorModels.Remove(typeCreditorModel);                       
                    }
                }
                responseModel.Status = true;
                responseModel.Message = $"Тип {nameTypeCreditor} видалений у кредитора {nameCreditor} ";

                writeInFile();
            }
            catch (Exception e)
            {
                responseModel.Status = false;
                responseModel.Message = e.Message;
            }

            return responseModel;
        }

        public ResponseModel deleteCreditor ( string name ) 
        {
            ResponseModel responseModel = new ResponseModel();

            try
            {
                CreditorModel creditorModel = creditorModels.Find(x => x.Name == name);

                if(creditorModel == null)
                {
                    responseModel.Status = false;
                    responseModel.Message = $"Кредитор {name} не існує";

                    return responseModel;
                }

                creditorModels.Remove(creditorModel);
                responseModel.Status = true;
                responseModel.Message = $"Кредитор {creditorModel.Name} успішно видалений";

                writeInFile();
            }
            catch(Exception e)
            {
                responseModel.Status = false;
                responseModel.Message = e.Message;
            }

            return responseModel;
        }

        private void writeInFile()
        {
            if (File.Exists(path))
            {
                File.Delete(path);
            }

            string text = "";

            foreach (CreditorModel creditorModel in creditorModels)
            {
                text = $"NameCreditor:{creditorModel.Name}\n";

                foreach (TypeCreditorModel typeCreditorModel in creditorModel.typeCreditorModels)
                {
                    text += $"-----------------------------------\n" +
                        $"TypeName:{typeCreditorModel.Name}\n" +
                        $"TypeMinSum:{typeCreditorModel.MinSum}\n" +
                        $"TypeMaxSum:{typeCreditorModel.MaxSum}\n" +
                        $"TypeMinTerm:{typeCreditorModel.MinTerm}\n" +
                        $"TypeMaxTerm:{typeCreditorModel.MaxTerm}\n" +
                        $"TypeBid:{typeCreditorModel.Bid}\n";
                }

                text += $"****************************\n";

                File.AppendAllText(path, text);
            }
        }

        private void readFromFile()
        {
            CreditorModel creditorModel = new CreditorModel();
            TypeCreditorModel typeCreditorModel = new TypeCreditorModel();

            if (File.Exists(path))
            {
                var text = File.ReadAllLines(path, Encoding.UTF8);

                foreach (string str in text)
                {
                    if (str.Contains("NameCreditor:"))
                    {
                        creditorModel.Name = str.Substring(13);
                    }

                    if (str.Contains("TypeName:"))
                    {
                        typeCreditorModel.Name = str.Substring(9);
                    }

                    if (str.Contains("TypeMinSum:"))
                    {
                        typeCreditorModel.MinSum = decimal.Parse(str.Substring(11));
                    }

                    if (str.Contains("TypeMaxSum:"))
                    {
                        typeCreditorModel.MaxSum = decimal.Parse(str.Substring(11));
                    }

                    if (str.Contains("TypeMinTerm:"))
                    {
                        typeCreditorModel.MinTerm = decimal.Parse(str.Substring(12));
                    }

                    if (str.Contains("TypeMaxTerm:"))
                    {
                        typeCreditorModel.MaxTerm = decimal.Parse(str.Substring(12));
                    }

                    if (str.Contains("TypeBid:"))
                    {
                        typeCreditorModel.Bid = decimal.Parse(str.Substring(8));

                        creditorModel.typeCreditorModels.Add( new TypeCreditorModel 
                        {
                            Name = typeCreditorModel.Name,
                            MinSum = typeCreditorModel.MinSum,
                            MaxSum = typeCreditorModel.MaxSum,
                            MinTerm = typeCreditorModel.MinTerm,
                            MaxTerm = typeCreditorModel.MaxTerm,
                            Bid = typeCreditorModel.Bid,
                        });
                    }
                    
                    if (str.Contains("*"))
                    {
                        if(creditorModel.Name == null)
                        {
                            continue;
                        }

                        creditorModels.Add(new CreditorModel 
                        {
                            Name = creditorModel.Name,
                            typeCreditorModels = creditorModel.typeCreditorModels
                        });

                        creditorModel = new CreditorModel();
                    }
                }
            }
        }
    }
}