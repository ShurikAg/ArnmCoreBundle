<?php
/*
 * This file is part of the Araneum package.
 *
 * (c) Alex Agulyansky <alex@iibspro.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
//TODO: Add proper license info


namespace Arnm\CoreBundle;

use Arnm\CoreBundle\DependencyInjection\BundleCompilerPass;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\Bundle\Bundle;
/**
 * ArnmCoreBindle specifics
 *
 * @author Alex Agulyansky <alex@iibspro.com>
 *
 * @codeCoverageIgnore
 */
class ArnmCoreBundle extends Bundle
{

    public function build(ContainerBuilder $container)
    {
        parent::build($container);

        $container->addCompilerPass(new BundleCompilerPass());
    }
}
