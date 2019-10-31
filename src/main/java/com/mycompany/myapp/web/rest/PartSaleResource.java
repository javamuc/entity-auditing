package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.PartSale;
import com.mycompany.myapp.repository.PartSaleRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.PartSale}.
 */
@RestController
@RequestMapping("/api")
public class PartSaleResource {

    private final Logger log = LoggerFactory.getLogger(PartSaleResource.class);

    private static final String ENTITY_NAME = "partSale";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PartSaleRepository partSaleRepository;

    public PartSaleResource(PartSaleRepository partSaleRepository) {
        this.partSaleRepository = partSaleRepository;
    }

    /**
     * {@code POST  /part-sales} : Create a new partSale.
     *
     * @param partSale the partSale to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new partSale, or with status {@code 400 (Bad Request)} if the partSale has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/part-sales")
    public ResponseEntity<PartSale> createPartSale(@RequestBody PartSale partSale) throws URISyntaxException {
        log.debug("REST request to save PartSale : {}", partSale);
        if (partSale.getId() != null) {
            throw new BadRequestAlertException("A new partSale cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PartSale result = partSaleRepository.save(partSale);
        return ResponseEntity.created(new URI("/api/part-sales/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /part-sales} : Updates an existing partSale.
     *
     * @param partSale the partSale to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated partSale,
     * or with status {@code 400 (Bad Request)} if the partSale is not valid,
     * or with status {@code 500 (Internal Server Error)} if the partSale couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/part-sales")
    public ResponseEntity<PartSale> updatePartSale(@RequestBody PartSale partSale) throws URISyntaxException {
        log.debug("REST request to update PartSale : {}", partSale);
        if (partSale.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PartSale result = partSaleRepository.save(partSale);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, partSale.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /part-sales} : get all the partSales.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of partSales in body.
     */
    @GetMapping("/part-sales")
    public List<PartSale> getAllPartSales() {
        log.debug("REST request to get all PartSales");
        return partSaleRepository.findAll();
    }

    /**
     * {@code GET  /part-sales/:id} : get the "id" partSale.
     *
     * @param id the id of the partSale to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the partSale, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/part-sales/{id}")
    public ResponseEntity<PartSale> getPartSale(@PathVariable String id) {
        log.debug("REST request to get PartSale : {}", id);
        Optional<PartSale> partSale = partSaleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(partSale);
    }

    /**
     * {@code DELETE  /part-sales/:id} : delete the "id" partSale.
     *
     * @param id the id of the partSale to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/part-sales/{id}")
    public ResponseEntity<Void> deletePartSale(@PathVariable String id) {
        log.debug("REST request to delete PartSale : {}", id);
        partSaleRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
