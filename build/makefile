MA2Croot = ..
XML = $(MA2Croot)/src
XSL = $(MA2Croot)/xsl
HTML = $(MA2Croot)/html

MB = ~/mathbook

HTML_XSL = waltbook-html.xsl
LATEX_XSL = waltbook-latex.xsl

XML_base = workbook.xml
XML_single = worksection.xml
LATEX_base = model-calculus
LATEX_single = test-section

.PHONY: html_files html_images pdf single

html_files: $(HTML)
	cd $(HTML) && xsltproc --xinclude $(XSL)/$(HTML_XSL) $(XML)/$(XML_base)

$(HTML):
	mkdir $(HTML)

$(HTML)/images: $(HTML)
	mkdir $(HTML)/images

html_images: $(HTML)/images
	cp -a $(MA2Croot)/img/ $(HTML)/images/
	$(MB)/script/mbx -c latex-image -d $(HTML)/images/ -f svg $(XML)/$(XML_base)

single: $(LATEX_single).pdf;

.PHONY: $(LATEX_single).tex

$(LATEX_single).tex:
	xsltproc --xinclude $(XSL)/$(LATEX_XSL) $(XML)/$(XML_single)

$(LATEX_single).pdf: images $(LATEX_single).tex
	cp -a $(MA2Croot)/img/ images/
	pdflatex $(LATEX_single).tex
    
pdf: $(LATEX_base).pdf ;

images:
	mkdir images

.PHONY: $(LATEX_base).tex

$(LATEX_base).tex:
	xsltproc --xinclude $(XSL)/$(LATEX_XSL) $(XML)/$(XML_base)

$(LATEX_base).pdf: images $(LATEX_base).tex
	cp -a $(MA2Croot)/img/ images/
	pdflatex $(LATEX_base).tex
	pdflatex $(LATEX_base).tex
