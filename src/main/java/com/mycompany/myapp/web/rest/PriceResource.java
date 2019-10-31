package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Price;
import com.mycompany.myapp.repository.PriceRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Price}.
 */
@RestController
@RequestMapping("/api")
public class PriceResource {

    private final Logger log = LoggerFactory.getLogger(PriceResource.class);

    private static final String ENTITY_NAME = "price";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PriceRepository priceRepository;

    public PriceResource(PriceRepository priceRepository) {
        this.priceRepository = priceRepository;
    }

    /**
     * {@code POST  /prices} : Create a new price.
     *
     * @param price the price to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new price, or with status {@code 400 (Bad Request)} if the price has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/prices")
    public ResponseEntity<Price> createPrice(@RequestBody Price price) throws URISyntaxException {
        log.debug("REST request to save Price : {}", price);
        if (price.getId() != null) {
            throw new BadRequestAlertException("A new price cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Price result = priceRepository.save(price);
        return ResponseEntity.created(new URI("/api/prices/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /prices} : Updates an existing price.
     *
     * @param price the price to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated price,
     * or with status {@code 400 (Bad Request)} if the price is not valid,
     * or with status {@code 500 (Internal Server Error)} if the price couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/prices")
    public ResponseEntity<Price> updatePrice(@RequestBody Price price) throws URISyntaxException {
        log.debug("REST request to update Price : {}", price);
        if (price.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Price result = priceRepository.save(price);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, price.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /prices} : get all the prices.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of prices in body.
     */
    @GetMapping("/prices")
    public List<Price> getAllPrices() {
        log.debug("REST request to get all Prices");
        return priceRepository.findAll();
    }

    /**
     * {@code GET  /prices/:id} : get the "id" price.
     *
     * @param id the id of the price to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the price, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/prices/{id}")
    public ResponseEntity<Price> getPrice(@PathVariable String id) {
        log.debug("REST request to get Price : {}", id);
        Optional<Price> price = priceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(price);
    }

    /**
     * {@code DELETE  /prices/:id} : delete the "id" price.
     *
     * @param id the id of the price to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/prices/{id}")
    public ResponseEntity<Void> deletePrice(@PathVariable String id) {
        log.debug("REST request to delete Price : {}", id);
        priceRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
