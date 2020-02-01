package br.com.rafaelvasconcelos.controllers;

import br.com.rafaelvasconcelos.helpers.ModeloCRUD;
import br.com.rafaelvasconcelos.models.AluguelSituacao;
import br.com.rafaelvasconcelos.models.Cliente;
import br.com.rafaelvasconcelos.repositorys.AluguelSituacaoRepository;
import br.com.rafaelvasconcelos.repositorys.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/aluguel_situacao")
public class AluguelSituacaoController implements ModeloCRUD<AluguelSituacao>, WebMvcConfigurer {

    private static final String SLASH = "/";
    private static final String PATH_LISTAR = "listar";
    private static final String PATH_BUSCAR = "buscar";
    private static final String PATH_CADASTRAR = "cadastrar";
    private static final String PATH_ATUALIZAR = "atualizar";
    private static final String PATH_REMOVER = "remover";

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                        "*")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true)
        ;
    }

    @Autowired
    private AluguelSituacaoRepository aluguelSituacaoRepository;


    @Override
    @GetMapping(SLASH + PATH_LISTAR)
    public List<AluguelSituacao> listar() {
        return aluguelSituacaoRepository.findAll();
    }

    @Override
    @GetMapping(SLASH + PATH_BUSCAR + SLASH + "{id}")
    public Optional<AluguelSituacao> buscar(@PathVariable(name = "id") Long id) {
        return aluguelSituacaoRepository.findById(id);
    }

    @Override
    @PutMapping(SLASH + PATH_CADASTRAR)
    public AluguelSituacao cadastrar(@RequestBody AluguelSituacao aluguelSituacao) {
        return aluguelSituacaoRepository.save(aluguelSituacao);
    }

    @Override
    @PutMapping(SLASH + PATH_ATUALIZAR)
    public AluguelSituacao atualizar(@RequestBody AluguelSituacao aluguelSituacao) {
        return aluguelSituacaoRepository.save(aluguelSituacao);
    }

    @Override
    @GetMapping(SLASH + PATH_REMOVER + SLASH + "{id}")
    public void remover(Long id) {
        aluguelSituacaoRepository.deleteById(id);
    }
}
