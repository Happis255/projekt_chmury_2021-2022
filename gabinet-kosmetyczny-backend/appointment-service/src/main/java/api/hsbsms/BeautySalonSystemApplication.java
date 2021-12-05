package api.hsbsms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Collections;

@SpringBootApplication
public class BeautySalonSystemApplication {

	public static final String LOCALHOST = "http://localhost:4200";

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(BeautySalonSystemApplication.class);
		app.setDefaultProperties(Collections
				.singletonMap("server.port", "8101"));
		app.run(args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/login").allowedOrigins(LOCALHOST);
				registry.addMapping("/admin").allowedOrigins(LOCALHOST);
				registry.addMapping("/user").allowedOrigins(LOCALHOST);
				registry.addMapping("/client").allowedOrigins(LOCALHOST);
			}
		};
	}
}
