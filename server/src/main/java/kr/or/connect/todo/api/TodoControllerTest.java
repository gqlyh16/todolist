package kr.or.connect.todo.api;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;


@RunWith(SpringRunner.class)
@SpringBootTest
public class TodoControllerTest {
	@Autowired
	WebApplicationContext wac;
	MockMvc mvc;

	@Before
	public void setUp() {
		this.mvc = webAppContextSetup(this.wac)
			.alwaysDo(print(System.out))
			.build();
	}

	@Test
	public void shouldCreate() throws Exception {
		String requestBody = "{\"todo\":\"Taste jQuery\"}";

		mvc.perform(
			post("/api/todos")
				.contentType(MediaType.APPLICATION_JSON)
				.content(requestBody)
			)
			.andExpect(status().isCreated())
			.andExpect(jsonPath("$.id").exists())
			.andExpect(jsonPath("$.todo").value("Taste jQuery"));
	}
	
	@Test
	public void shouldUpdate() throws Exception {
		String requestBody = "{\"completed\":\"1\"}";

		mvc.perform(
			put("/api/todos/9")
				.contentType(MediaType.APPLICATION_JSON)
				.content(requestBody)
			)
			.andExpect(status().isNoContent());
	}

	@Test
	public void shouldDelete() throws Exception {
		mvc.perform(
			delete("/api/todos/9")
				.contentType(MediaType.APPLICATION_JSON)
		)
		.andExpect(status().isNoContent());
	}
}
