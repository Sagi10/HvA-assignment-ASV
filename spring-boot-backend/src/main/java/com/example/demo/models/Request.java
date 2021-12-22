package com.example.demo.models;

import com.example.demo.enums.PlaneTypes;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
public class Request {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  private String location;

  private LocalDateTime deadline;

  @Enumerated(EnumType.STRING)
  private PlaneTypes planeType;

  private String tailType;
  private String wagonType;
  private int selectedWagon;
  private String position;
  private String status;
  private String extraInfo;

  private LocalDateTime requestCreated;

  @JsonIgnore
  private LocalDateTime requestUpdated;

  private LocalDateTime completionTime;

  private LocalDateTime deliveryTime;

  @JsonIgnore
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="userId")
  private User user;

  protected Request() {
  }

  public Request(String location, LocalDateTime deadline, PlaneTypes planeType, String tailType,
                 String wagonType, int selectedWagon, String position, String status, String extraInfo) {
    this.location = location;
    this.deadline = deadline;
    this.planeType = planeType;
    this.tailType = tailType;
    this.wagonType = wagonType;
    this.selectedWagon = selectedWagon;
    this.position = position;
    this.status = status;
    this.extraInfo = extraInfo;
  }

  @PreUpdate
  @PrePersist
  public void updateTimeStamps() {
    requestUpdated = LocalDateTime.now();
    if (requestCreated == null) {
      requestCreated = LocalDateTime.now();
    }
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Request request = (Request) o;
    return id == request.id;
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    this.location = location;
  }

  public LocalDateTime getCompletionTime() {
    return completionTime;
  }

  public void setCompletionTime(LocalDateTime requestTime) {
    this.completionTime = requestTime;
  }

  public LocalDateTime getDeadline() {
    return deadline;
  }

  public void setDeadline(LocalDateTime deadline) {
    this.deadline = deadline;
  }

  public PlaneTypes getPlaneType() {
    return planeType;
  }

  public void setPlaneType(PlaneTypes planeType) {
    this.planeType = planeType;
  }

  public String getTailType() {
    return tailType;
  }

  public void setTailType(String tailType) {
    this.tailType = tailType;
  }

  public String getWagonType() {
    return wagonType;
  }

  public void setWagonType(String wagonType) {
    this.wagonType = wagonType;
  }

  public int getSelectedWagon() {
    return selectedWagon;
  }

  public void setSelectedWagon(int selectedWagon) {
    this.selectedWagon = selectedWagon;
  }

  public String getPosition() {
    return position;
  }

  public void setPosition(String position) {
    this.position = position;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getExtraInfo() {
    return extraInfo;
  }

  public void setExtraInfo(String extraInfo) {
    this.extraInfo = extraInfo;
  }

  public long getMechanicId() {
    return this.user.getId();
  }

  public LocalDateTime getRequestCreated() {
    return requestCreated;
  }

  public void setRequestCreated(LocalDateTime requestCreated) {
    this.requestCreated = requestCreated;
  }

  public LocalDateTime getDeliveryTime() {
    return deliveryTime;
  }

  public void setDeliveryTime(LocalDateTime deliveryTime) {
    this.deliveryTime = deliveryTime;
  }

  public LocalDateTime getRequestUpdated() {
    return requestUpdated;
  }

  public void setRequestUpdated(LocalDateTime requestUpdated) {
    this.requestUpdated = requestUpdated;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  @Override
  public String toString() {
    return "Request{" +
      "id=" + id +
      ", location='" + location + '\'' +
      ", completionTime=" + completionTime +
      ", deadline=" + deadline +
      ", planeType=" + planeType +
      ", tailType='" + tailType + '\'' +
      ", wagonType='" + wagonType + '\'' +
      ", selectedWagon='" + selectedWagon + '\'' +
      ", position='" + position + '\'' +
      ", status='" + status + '\'' +
      ", extraInfo='" + extraInfo + '\'' +
      ", requestCreated=" + requestCreated +
      ", requestUpdated=" + requestUpdated +
      ", user=" + user +
      '}';
  }
}

