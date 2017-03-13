package com.dev;

import com.dev.model.Provider;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.atomic.AtomicLong;

@Controller
@RequestMapping("/hello-world")
public class HelloController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @RequestMapping(method=RequestMethod.GET)
    public @ResponseBody
    Provider sayHello(@RequestParam(value="name", required=false, defaultValue="Stranger") String name) {
        Provider provider = new Provider();
        provider.setMail("This is mail");
        provider.setPhone("This is phone");
        provider.setProviderId(123);
        return provider;
    }
}