package com.example.demo.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum TailTypes {
  //Dit is random voor de data.sql
  @JsonProperty("PH_AKA")
  PH_AKA,
  @JsonProperty("PH_AKB")
  PH_AKB,
  @JsonProperty("PH_AKD")
  PH_AKD,
  @JsonProperty("PH_AKE")
  PH_AKE
}
