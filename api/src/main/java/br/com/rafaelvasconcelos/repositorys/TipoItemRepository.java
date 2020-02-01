package br.com.rafaelvasconcelos.repositorys;

import br.com.rafaelvasconcelos.models.Cliente;
import br.com.rafaelvasconcelos.models.TipoItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TipoItemRepository extends JpaRepository<TipoItem, Long> {

    Optional<TipoItem> findById(Long id);
}
