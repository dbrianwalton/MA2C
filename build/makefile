MA2Croot = ..
XML = $(MA2Croot)/src
XSL = $(MA2Croot)/xsl
HTML = $(MA2Croot)/html

MB = ~/mathbook
RNG = ~/jing-trang

HTML_XSL = waltbook-html.xsl
LATEX_XSL = waltbook-latex.xsl

XML_base = ma2c.xml
XML_oldbase = workbook.xml
XML_single = worksection.xml
LATEX_base = model-calculus
LATEX_single = test-section

.PHONY: rng ma2c.validate

rng: ma2c.validate ;

ma2c.validate:
	java -classpath $(RNG)/build -Dorg.apache.xerces.xni.parser.XMLParserConfiguration=org.apache.xerces.parsers.XIncludeParserConfiguration -jar $(RNG)/build/jing.jar $(MB)/Schema/pretext.rng $(XML)/ma2c.xml > ma2c.validate

.PHONY: html_files html_images pdf single

html_single: $(HTML)
	cp -a ${XML}/js ${HTML}/
	cd $(HTML) && xsltproc --xinclude $(XSL)/$(HTML_XSL) $(XML)/$(XML_single)

html_single_images: $(HTML)/images
	cp -a $(MA2Croot)/img/ $(HTML)/images/
	$(MB)/script/mbx --include $(MA2Croot)/src/data/ -c latex-image -d $(HTML)/images/ -f svg $(XML)/$(XML_single)


html_files: $(HTML)
	cp -a ${XML}/js ${HTML}/
	cd $(HTML) && xsltproc --xinclude $(XSL)/$(HTML_XSL) $(XML)/$(XML_base)

$(HTML):
	mkdir $(HTML)

$(HTML)/images: $(HTML)
	if [ ! -d "$(HTML)/images" ] ; then mkdir $(HTML)/images ; fi

html_images: $(HTML)/images
	cp -a $(MA2Croot)/img/ $(HTML)/images/
	$(MB)/script/mbx --include $(MA2Croot)/src/data/ -c latex-image -d $(HTML)/images/ -f svg $(XML)/$(XML_base)

single: $(LATEX_single).pdf;

.PHONY: $(LATEX_single).tex

$(LATEX_single).tex:
	xsltproc -o $(LATEX_single).tex --xinclude $(XSL)/$(LATEX_XSL) $(XML)/$(XML_single)

$(LATEX_single).pdf: images $(LATEX_single).tex
	cp -a $(MA2Croot)/img/ images/
	cp -a $(MA2Croot)/src/data/ data/
	pdflatex $(LATEX_single).tex

pdf: $(LATEX_base).pdf ;

latex: $(LATEX_base).tex ;

images:
	mkdir images
data:
	mkdir data

.PHONY: $(LATEX_base).tex

$(LATEX_base).tex:
	xsltproc -o $(LATEX_base).tex --xinclude $(XSL)/$(LATEX_XSL) $(XML)/$(XML_base)

$(LATEX_base).pdf: images $(LATEX_base).tex
	cp -a $(MA2Croot)/img/ images/
	cp -a $(MA2Croot)/src/data/ data/
	pdflatex $(LATEX_base).tex
	pdflatex $(LATEX_base).tex
