package com.example.demo.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum RequestStatus {
  Pending,
  Accepted,
  Delivered,
  Collect,
  Finished
}
