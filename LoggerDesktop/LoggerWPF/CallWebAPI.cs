using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;


namespace LoggerWPF
{

    public class Token
    {
        public string status { get; set; }
        public string access_token { get; set; }
        public string token_type { get; set; }
        public string refresh_token { get; set; }
        public string expires_in { get; set; }
        public string scope { get; set; }
    }

    public class CallWebAPI
    {
        HttpClient client = new HttpClient();
        public Token token = new Token();
        string client_secret = "secret";
        string client_id = "atms";
        public developer g { get; set; }

        public CallWebAPI()
        {
            g = new developer();
            client.BaseAddress = new Uri("http://localhost:8080");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        //static async Task<Uri> CreateDocAsync(Product product)
        //{
        //    HttpResponseMessage response = await client.PostAsJsonAsync(\"api/products\", product);
        //    response.EnsureSuccessStatusCode();

        //    // return URI of the created resource.
        //    return response.Headers.Location;
        //}

        public void GetToken(string login, string password)
        {
            string formData = "username=" + "Patrol" + "&password=" + "error" +
            "&grant_type=password&scope=read%20write&client_secret=" + client_secret + "&client_id=" + client_id;
            var byteArray = System.Text.UTF8Encoding.UTF8.GetBytes("atms:secret");
            //client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));
            HttpRequestMessage request = new HttpRequestMessage(new HttpMethod("POST"), "oauth/token");
            request.Headers.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));
            request.Content = new StringContent(formData, Encoding.UTF8);
            request.Content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");
                //new StringContent(formData, Encoding.UTF8);
            //request.Headers.Add("Content-Type", "application/x-www-form-urlencoded");
            var response = client.SendAsync(request).Result;
            if (response.StatusCode == HttpStatusCode.OK)
            {
                HttpContent httpContent = response.Content;
                string responseString = httpContent.ReadAsStringAsync().Result;
                string k = request.Content.ToString();
                token = JsonConvert.DeserializeObject<Token>(responseString);
                token.status = "1";
            }
            else
            {
                token.status = "0";
            }
        }

        public void RefreshToken()
        {
            string formData = "grant_type=refresh_token&refresh_token=" + token.refresh_token + "&client_secret=secret&client_id=atms";
            var byteArray = System.Text.UTF8Encoding.UTF8.GetBytes("atms:secret");
            //client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));
            HttpRequestMessage request = new HttpRequestMessage(new HttpMethod("POST"), "oauth/token");
            request.Headers.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));
            request.Content = new StringContent(formData, Encoding.UTF8);
            request.Content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");
            var response = client.SendAsync(request).Result;
            if (response.StatusCode == HttpStatusCode.OK)
            {
                HttpContent httpContent = response.Content;
                string responseString = httpContent.ReadAsStringAsync().Result;
                string k = request.Content.ToString();
                token = JsonConvert.DeserializeObject<Token>(responseString);
                token.status = "1";
            }
            else
            {
                token.status = "0";
            }
        }

        public List<ProjectModel> GetProjects()
        {
            HttpRequestMessage request = new HttpRequestMessage(new HttpMethod("GET"), "/api/project/developer/" + g.developerId);
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token.access_token);
            request.Headers.CacheControl = CacheControlHeaderValue.Parse("No-cache");
            var response = client.SendAsync(request).Result;
            if (response.IsSuccessStatusCode)
            {
                HttpContent httpContent = response.Content;
                string responseString = httpContent.ReadAsStringAsync().Result;
                return JsonConvert.DeserializeObject<List<ProjectModel>>(responseString);
            }
            else
            {
                HttpContent httpContent = response.Content;
                string responseString = httpContent.ReadAsStringAsync().Result;
                RefreshToken();
                GetProjects();
            }
            return null;
        }

        public void GetProfile()
        {
            HttpRequestMessage request = new HttpRequestMessage(new HttpMethod("GET"), "api/developer/current");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token.access_token);
            request.Headers.CacheControl = CacheControlHeaderValue.Parse("No-cache");
            var response = client.SendAsync(request).Result;
            if (response.IsSuccessStatusCode)
            {
                HttpContent httpContent = response.Content;
                string responseString = httpContent.ReadAsStringAsync().Result;
                g = JsonConvert.DeserializeObject<developer>(responseString);
                g.devTypeSTR = GetDevType(g.developerId);
            }
            else
            {
                HttpContent httpContent = response.Content;
                string responseString = httpContent.ReadAsStringAsync().Result;
                RefreshToken();
                GetProfile();
            }
            return;
        }

        public string GetDevType(int id)
        {
            HttpRequestMessage request = new HttpRequestMessage(new HttpMethod("GET"), "api/devType/" + id);
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token.access_token);
            request.Headers.CacheControl = CacheControlHeaderValue.Parse("No-cache");
            var response = client.SendAsync(request).Result;
            devType dev = new devType();
            if (response.IsSuccessStatusCode)
            {
                HttpContent httpContent = response.Content;
                string responseString = httpContent.ReadAsStringAsync().Result;
                dev = JsonConvert.DeserializeObject<devType>(responseString);
            }
            else
            {
                HttpContent httpContent = response.Content;
                string responseString = httpContent.ReadAsStringAsync().Result;
                RefreshToken();
            }
            return dev.value;
        }

        public List<TaskModel> GetTasks(int id)
        {
            HttpRequestMessage request = new HttpRequestMessage(new HttpMethod("GET"), "/api/task/project/" + id);
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token.access_token);
            request.Headers.CacheControl = CacheControlHeaderValue.Parse("No-cache");
            var response = client.SendAsync(request).Result;
            if (response.IsSuccessStatusCode)
            {
                HttpContent httpContent = response.Content;
                string responseString = httpContent.ReadAsStringAsync().Result;
                return JsonConvert.DeserializeObject<List<TaskModel>>(responseString);
            }
            else
            {
                HttpContent httpContent = response.Content;
                string responseString = httpContent.ReadAsStringAsync().Result;
                RefreshToken();
                GetTasks(id);
            }
            return null;///api/log/task/
        }



        public void PutLog(int id, string programList, byte[] byteArray)
        {
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, "/api/log/task/" + id);
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token.access_token);
            request.Headers.CacheControl = CacheControlHeaderValue.Parse("No-cache");
            var formData = new MultipartFormDataContent();

            var values = new[]
        {
            new KeyValuePair<string, string>("applications", programList),
        };
            foreach (var keyValuePair in values)
            {
                formData.Add(new StringContent(keyValuePair.Value), keyValuePair.Key);
            }
            HttpContent bytesContent = new ByteArrayContent(byteArray);
            bytesContent.Headers.ContentDisposition = new ContentDispositionHeaderValue("form-data")
            {
                Name = "file",
                FileName = "file2222.bmp"
            };
            bytesContent.Headers.ContentType = new MediaTypeHeaderValue("image/bmp");
            formData.Add(bytesContent);
            request.Content = formData;
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var response = client.SendAsync(request).Result;
            if (response.IsSuccessStatusCode)
            {
                HttpContent httpContent = response.Content;
                string responseString = httpContent.ReadAsStringAsync().Result;
            }
            else
            {
                HttpContent httpContent = response.Content;
                string responseString = httpContent.ReadAsStringAsync().Result;
            }
            return;///api/log/task/
        }
    }
}
