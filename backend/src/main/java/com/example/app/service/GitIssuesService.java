package com.example.app.service;

import com.example.app.model.GitIssue;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GitIssuesService {

    private static final List<GitIssue> ISSUES = List.of(
            new GitIssue(
                    8L,
                    "Git Issues page",
                    "agentic-web-dev",
                    "open",
                    8,
                    0,
                    List.of("enhancement"),
                    "https://github.com/cdcrock/agentic-web-dev/issues/8"
            ),
            new GitIssue(
                    3L,
                    "Health endpoint wiring",
                    "platform-tools",
                    "closed",
                    3,
                    2,
                    List.of("backend", "maintenance"),
                    "https://github.com/cdcrock/platform-tools/issues/3"
            )
    );

    public List<GitIssue> getIssues(String repository, String status) {
        return ISSUES.stream()
                .filter(issue -> isBlank(repository) || issue.repository().equalsIgnoreCase(repository))
                .filter(issue -> isBlank(status) || issue.status().equalsIgnoreCase(status))
                .toList();
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}