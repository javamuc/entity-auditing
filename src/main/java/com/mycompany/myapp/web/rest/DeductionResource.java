package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Deduction;
import com.mycompany.myapp.repository.DeductionRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Deduction}.
 */
@RestController
@RequestMapping("/api")
public class DeductionResource {

    private final Logger log = LoggerFactory.getLogger(DeductionResource.class);

    private static final String ENTITY_NAME = "deduction";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DeductionRepository deductionRepository;

    public DeductionResource(DeductionRepository deductionRepository) {
        this.deductionRepository = deductionRepository;
    }

    /**
     * {@code POST  /deductions} : Create a new deduction.
     *
     * @param deduction the deduction to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new deduction, or with status {@code 400 (Bad Request)} if the deduction has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/deductions")
    public ResponseEntity<Deduction> createDeduction(@RequestBody Deduction deduction) throws URISyntaxException {
        log.debug("REST request to save Deduction : {}", deduction);
        if (deduction.getId() != null) {
            throw new BadRequestAlertException("A new deduction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Deduction result = deductionRepository.save(deduction);
        return ResponseEntity.created(new URI("/api/deductions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /deductions} : Updates an existing deduction.
     *
     * @param deduction the deduction to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated deduction,
     * or with status {@code 400 (Bad Request)} if the deduction is not valid,
     * or with status {@code 500 (Internal Server Error)} if the deduction couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/deductions")
    public ResponseEntity<Deduction> updateDeduction(@RequestBody Deduction deduction) throws URISyntaxException {
        log.debug("REST request to update Deduction : {}", deduction);
        if (deduction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Deduction result = deductionRepository.save(deduction);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, deduction.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /deductions} : get all the deductions.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of deductions in body.
     */
    @GetMapping("/deductions")
    public List<Deduction> getAllDeductions() {
        log.debug("REST request to get all Deductions");
        return deductionRepository.findAll();
    }

    /**
     * {@code GET  /deductions/:id} : get the "id" deduction.
     *
     * @param id the id of the deduction to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the deduction, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/deductions/{id}")
    public ResponseEntity<Deduction> getDeduction(@PathVariable String id) {
        log.debug("REST request to get Deduction : {}", id);
        Optional<Deduction> deduction = deductionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(deduction);
    }

    /**
     * {@code DELETE  /deductions/:id} : delete the "id" deduction.
     *
     * @param id the id of the deduction to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/deductions/{id}")
    public ResponseEntity<Void> deleteDeduction(@PathVariable String id) {
        log.debug("REST request to delete Deduction : {}", id);
        deductionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
