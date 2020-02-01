package br.com.rafaelvasconcelos.repositorys;

import br.com.rafaelvasconcelos.models.AluguelSituacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AluguelSituacaoRepository extends JpaRepository<AluguelSituacao, Long> {

    Optional<AluguelSituacao> findById(Long id);
}
