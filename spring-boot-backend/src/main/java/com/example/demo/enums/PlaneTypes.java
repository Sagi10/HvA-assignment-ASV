package com.example.demo.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum  PlaneTypes {
  @JsonProperty("737-700")
  BOEING737700,
  @JsonProperty("737-800")
  BOEING737800,
  @JsonProperty("737-900")
  BOEING737900,
  @JsonProperty("747-400")
  BOEING747400,
  @JsonProperty("747-400F")
  BOEING747400F,
  @JsonProperty("777-200")
  BOEING777200,
  @JsonProperty("777-300")
  BOEING777300,
  @JsonProperty("787-9")
  BOEING7879,
  @JsonProperty("A330-200")
  AIRBUSA330200,
  @JsonProperty("A330-300")
  AIRBUSA330300
}
