package TodolistServer.Controller;

import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


@RestController
public class ControllerApi {
    int contador = -1;
    private final ArrayList<String> stringList = new ArrayList<>();
    private ObjectMapper objectMapper; 
   
     public ControllerApi(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }
    
    @CrossOrigin(origins = "*", allowedHeaders="*")
    @PostMapping("/api")
    public ApiResponse handleApiRequest(@RequestBody RequestBodyy req) {
        String inputString = req.getInputString();
        stringList.add(inputString); 
    
        return new ApiResponse("String recebida com sucesso: ");
    }
    @CrossOrigin(origins = "*", allowedHeaders="*")
    @GetMapping("api/list") 
    public String getStringList() {
        contador = contador + 1;
        String getTodo = stringList.get(contador);
       Map<String, String> criarjson = new HashMap<>();
        criarjson.put("valorstring", getTodo);

        try {
            
            String jsonString = objectMapper.writeValueAsString(criarjson);
            return jsonString;
        } catch (Exception e) {
           
            e.printStackTrace();
            return "{}";
        }
    }
}
