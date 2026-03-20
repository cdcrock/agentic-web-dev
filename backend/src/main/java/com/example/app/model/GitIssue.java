package com.example.app.model;

import java.util.List;

public record GitIssue(
        long id,
        String title,
        String repository,
        String status,
        int number,
        int comments,
        List<String> labels,
        String url
) {
}