package com.example.urlshortener.controller;

import com.example.urlshortener.dto.ShortenRequest;
import com.example.urlshortener.entity.Url;
import com.example.urlshortener.service.UrlShortenerService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Optional;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5175")
public class UrlController {

    private final UrlShortenerService urlShortenerService;

    @PostMapping("/shorten")
    public ResponseEntity<String> shortenUrl(@RequestBody ShortenRequest request) {
        String originalUrl = request.getOriginalUrl();
        if (originalUrl == null || originalUrl.isEmpty()) {
            return ResponseEntity.badRequest().body("originalUrl cannot be empty");
        }

        if (!originalUrl.startsWith("http://") && !originalUrl.startsWith("https://")) {
            originalUrl = "https://" + originalUrl;
        }

        String shortCode = urlShortenerService.shortenUrl(originalUrl);
        return ResponseEntity.ok(shortCode);
    }

    @GetMapping("/{code}")
    public ResponseEntity<Void> redirectToOriginalUrl(@PathVariable String code, HttpServletRequest request) {
        String referrer = request.getHeader(HttpHeaders.REFERER);

        Optional<Url> urlOpt = urlShortenerService.getOriginalUrlAndRecordClick(code, referrer);

        if (urlOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.FOUND) // 302 Redirect
                    .location(URI.create(urlOpt.get().getOriginalUrl()))
                    .build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
