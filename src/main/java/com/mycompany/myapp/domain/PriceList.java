package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * A PriceList.
 */
@Document(collection = "price_list")
public class PriceList implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("valid_from")
    private LocalDate validFrom;

    @Field("valid_till")
    private LocalDate validTill;

    @Field("type")
    private String type;

    @Field("created_by")
    private String createdBy;

    @Field("created_at")
    private ZonedDateTime createdAt;

    @Field("last_updated_by")
    private String lastUpdatedBy;

    @Field("last_updated_at")
    private ZonedDateTime lastUpdatedAt;

    @DBRef
    @Field("condition")
    private Set<ConditionDefinition> conditions = new HashSet<>();

    @DBRef
    @Field("deduction")
    private Set<Deduction> deductions = new HashSet<>();

    @DBRef
    @Field("partSale")
    private Set<PartSale> partSales = new HashSet<>();

    @DBRef
    @Field("price")
    private Set<Price> prices = new HashSet<>();

    @DBRef
    @Field("customer")
    @JsonIgnoreProperties("priceLists")
    private Customer customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDate getValidFrom() {
        return validFrom;
    }

    public PriceList validFrom(LocalDate validFrom) {
        this.validFrom = validFrom;
        return this;
    }

    public void setValidFrom(LocalDate validFrom) {
        this.validFrom = validFrom;
    }

    public LocalDate getValidTill() {
        return validTill;
    }

    public PriceList validTill(LocalDate validTill) {
        this.validTill = validTill;
        return this;
    }

    public void setValidTill(LocalDate validTill) {
        this.validTill = validTill;
    }

    public String getType() {
        return type;
    }

    public PriceList type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public PriceList createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public PriceList createdAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getLastUpdatedBy() {
        return lastUpdatedBy;
    }

    public PriceList lastUpdatedBy(String lastUpdatedBy) {
        this.lastUpdatedBy = lastUpdatedBy;
        return this;
    }

    public void setLastUpdatedBy(String lastUpdatedBy) {
        this.lastUpdatedBy = lastUpdatedBy;
    }

    public ZonedDateTime getLastUpdatedAt() {
        return lastUpdatedAt;
    }

    public PriceList lastUpdatedAt(ZonedDateTime lastUpdatedAt) {
        this.lastUpdatedAt = lastUpdatedAt;
        return this;
    }

    public void setLastUpdatedAt(ZonedDateTime lastUpdatedAt) {
        this.lastUpdatedAt = lastUpdatedAt;
    }

    public Set<ConditionDefinition> getConditions() {
        return conditions;
    }

    public PriceList conditions(Set<ConditionDefinition> conditionDefinitions) {
        this.conditions = conditionDefinitions;
        return this;
    }

    public PriceList addCondition(ConditionDefinition conditionDefinition) {
        this.conditions.add(conditionDefinition);
        conditionDefinition.setPriceList(this);
        return this;
    }

    public PriceList removeCondition(ConditionDefinition conditionDefinition) {
        this.conditions.remove(conditionDefinition);
        conditionDefinition.setPriceList(null);
        return this;
    }

    public void setConditions(Set<ConditionDefinition> conditionDefinitions) {
        this.conditions = conditionDefinitions;
    }

    public Set<Deduction> getDeductions() {
        return deductions;
    }

    public PriceList deductions(Set<Deduction> deductions) {
        this.deductions = deductions;
        return this;
    }

    public PriceList addDeduction(Deduction deduction) {
        this.deductions.add(deduction);
        deduction.setPriceList(this);
        return this;
    }

    public PriceList removeDeduction(Deduction deduction) {
        this.deductions.remove(deduction);
        deduction.setPriceList(null);
        return this;
    }

    public void setDeductions(Set<Deduction> deductions) {
        this.deductions = deductions;
    }

    public Set<PartSale> getPartSales() {
        return partSales;
    }

    public PriceList partSales(Set<PartSale> partSales) {
        this.partSales = partSales;
        return this;
    }

    public PriceList addPartSale(PartSale partSale) {
        this.partSales.add(partSale);
        partSale.setPriceList(this);
        return this;
    }

    public PriceList removePartSale(PartSale partSale) {
        this.partSales.remove(partSale);
        partSale.setPriceList(null);
        return this;
    }

    public void setPartSales(Set<PartSale> partSales) {
        this.partSales = partSales;
    }

    public Set<Price> getPrices() {
        return prices;
    }

    public PriceList prices(Set<Price> prices) {
        this.prices = prices;
        return this;
    }

    public PriceList addPrice(Price price) {
        this.prices.add(price);
        price.setPriceList(this);
        return this;
    }

    public PriceList removePrice(Price price) {
        this.prices.remove(price);
        price.setPriceList(null);
        return this;
    }

    public void setPrices(Set<Price> prices) {
        this.prices = prices;
    }

    public Customer getCustomer() {
        return customer;
    }

    public PriceList customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PriceList)) {
            return false;
        }
        return id != null && id.equals(((PriceList) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PriceList{" +
            "id=" + getId() +
            ", validFrom='" + getValidFrom() + "'" +
            ", validTill='" + getValidTill() + "'" +
            ", type='" + getType() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", lastUpdatedBy='" + getLastUpdatedBy() + "'" +
            ", lastUpdatedAt='" + getLastUpdatedAt() + "'" +
            "}";
    }
}
