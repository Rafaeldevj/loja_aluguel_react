package br.com.rafaelvasconcelos.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "tb_item")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_item")
    private Long id;

    @NotNull
    private String nome;

    @NotNull
    @Column(columnDefinition = "DECIMAL(10,2)")
    private float valor;

    @Column(length = 1000)
    private String descricao;

    @Column(columnDefinition = "varchar(1) default 'S'")
    private String disponivel;

    @ManyToOne
    @JoinColumn(name = "id_tipo_item")
    private TipoItem tipoItem;

    @Column(name = "dt_cadastro", insertable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dataCadastro;

    public Item() {
    }

    public Item(String nome, float valor, String descricao, String disponivel, TipoItem tipoItem, Date dataCadastro) {
        this.nome = nome;
        this.valor = valor;
        this.descricao = descricao;
        this.disponivel = disponivel;
        this.tipoItem = tipoItem;
        this.dataCadastro = dataCadastro;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public float getValor() {
        return valor;
    }

    public void setValor(float valor) {
        this.valor = valor;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public TipoItem getTipoItem() {
        return tipoItem;
    }

    public void setTipoItem(TipoItem tipoItem) {
        this.tipoItem = tipoItem;
    }

    public Date getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(Date dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public String getDisponivel() {
        return disponivel;
    }

    public void setDisponivel(String disponivel) {
        this.disponivel = disponivel;
    }
}
