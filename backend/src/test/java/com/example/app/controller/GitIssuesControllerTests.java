package com.example.app.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.not;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class GitIssuesControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getGitIssues_shouldReturnIssuesAcrossRepositories() throws Exception {
        mockMvc.perform(get("/api/git-issues"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.issues").isArray())
                .andExpect(jsonPath("$.issues", not(hasSize(0))))
                .andExpect(jsonPath("$.issues[0].repository").isString())
                .andExpect(jsonPath("$.issues[0].status").isString());
    }

    @Test
    void getGitIssues_shouldFilterByRepositoryAndStatus() throws Exception {
        mockMvc.perform(get("/api/git-issues")
                        .param("repository", "agentic-web-dev")
                        .param("status", "open"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.issues").isArray())
                .andExpect(jsonPath("$.issues[*].repository", hasSize(1)))
                .andExpect(jsonPath("$.issues[0].repository", is("agentic-web-dev")))
                .andExpect(jsonPath("$.issues[0].status", is("open")));
    }

    @Test
    void getGitIssues_shouldIncludeSupplementaryDetailsForExpandedCards() throws Exception {
        mockMvc.perform(get("/api/git-issues"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.issues").isArray())
                .andExpect(jsonPath("$.issues[0].number").isNumber())
                .andExpect(jsonPath("$.issues[0].labels").isArray())
                .andExpect(jsonPath("$.issues[0].comments").isNumber())
                .andExpect(jsonPath("$.issues[0].url").isString());
    }
}