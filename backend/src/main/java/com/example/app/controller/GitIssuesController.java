package com.example.app.controller;

import com.example.app.model.GitIssue;
import com.example.app.service.GitIssuesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class GitIssuesController {

    private final GitIssuesService gitIssuesService;

    public GitIssuesController(GitIssuesService gitIssuesService) {
        this.gitIssuesService = gitIssuesService;
    }

    @GetMapping("/git-issues")
    public ResponseEntity<Map<String, List<GitIssue>>> getGitIssues(
            @RequestParam(required = false) String repository,
            @RequestParam(required = false) String status
    ) {
        List<GitIssue> issues = gitIssuesService.getIssues(repository, status);
        return ResponseEntity.ok(Map.of("issues", issues));
    }
}