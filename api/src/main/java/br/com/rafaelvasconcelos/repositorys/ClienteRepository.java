package br.com.rafaelvasconcelos.repositorys;

import br.com.rafaelvasconcelos.models.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    Optional<Cliente> findById(Long id);
}
