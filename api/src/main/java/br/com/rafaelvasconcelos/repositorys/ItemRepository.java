package br.com.rafaelvasconcelos.repositorys;

import br.com.rafaelvasconcelos.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long> {

    Optional<Item> findById(Long id);
}
