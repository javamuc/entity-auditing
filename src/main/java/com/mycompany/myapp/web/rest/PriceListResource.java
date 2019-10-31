package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.PriceList;
import com.mycompany.myapp.repository.PriceListRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.PriceList}.
 */
@RestController
@RequestMapping("/api")
public class PriceListResource {

    private final Logger log = LoggerFactory.getLogger(PriceListResource.class);

    private static final String ENTITY_NAME = "priceList";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PriceListRepository priceListRepository;

    public PriceListResource(PriceListRepository priceListRepository) {
        this.priceListRepository = priceListRepository;
    }

    /**
     * {@code POST  /price-lists} : Create a new priceList.
     *
     * @param priceList the priceList to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new priceList, or with status {@code 400 (Bad Request)} if the priceList has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/price-lists")
    public ResponseEntity<PriceList> createPriceList(@RequestBody PriceList priceList) throws URISyntaxException {
        log.debug("REST request to save PriceList : {}", priceList);
        if (priceList.getId() != null) {
            throw new BadRequestAlertException("A new priceList cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PriceList result = priceListRepository.save(priceList);
        return ResponseEntity.created(new URI("/api/price-lists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /price-lists} : Updates an existing priceList.
     *
     * @param priceList the priceList to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated priceList,
     * or with status {@code 400 (Bad Request)} if the priceList is not valid,
     * or with status {@code 500 (Internal Server Error)} if the priceList couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/price-lists")
    public ResponseEntity<PriceList> updatePriceList(@RequestBody PriceList priceList) throws URISyntaxException {
        log.debug("REST request to update PriceList : {}", priceList);
        if (priceList.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PriceList result = priceListRepository.save(priceList);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, priceList.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /price-lists} : get all the priceLists.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of priceLists in body.
     */
    @GetMapping("/price-lists")
    public List<PriceList> getAllPriceLists() {
        log.debug("REST request to get all PriceLists");
        return priceListRepository.findAll();
    }

    /**
     * {@code GET  /price-lists/:id} : get the "id" priceList.
     *
     * @param id the id of the priceList to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the priceList, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/price-lists/{id}")
    public ResponseEntity<PriceList> getPriceList(@PathVariable String id) {
        log.debug("REST request to get PriceList : {}", id);
        Optional<PriceList> priceList = priceListRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(priceList);
    }

    /**
     * {@code DELETE  /price-lists/:id} : delete the "id" priceList.
     *
     * @param id the id of the priceList to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/price-lists/{id}")
    public ResponseEntity<Void> deletePriceList(@PathVariable String id) {
        log.debug("REST request to delete PriceList : {}", id);
        priceListRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
